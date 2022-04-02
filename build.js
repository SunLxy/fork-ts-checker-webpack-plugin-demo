
/** 问题，4种情况
 * 1. 如果 下面代码的  ForkTsCheckerWebpackPlugin.getCompilerHooks 存在，plugin 中加 ForkTsCheckerWebpackPlugin --->  报错 
 * 2. 如果 下面代码的  ForkTsCheckerWebpackPlugin.getCompilerHooks 存在，plugin 中不加 ForkTsCheckerWebpackPlugin --->   不报错 
 * 3. 如果 下面代码的  ForkTsCheckerWebpackPlugin.getCompilerHooks 注释，plugin 中加 ForkTsCheckerWebpackPlugin   --->   不报错  
 * 4. 如果  clientConfig 不是数组  --->  不会报错
 * ***/

const clientConfig = require("./webpack.config")
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');
function compile(config) {
  return new Promise((resolve, reject) => {
    let compiler;
    try {
      compiler = webpack(config);
    } catch (e) {
      console.log('compile errors:', [e]); // eslint-disable-line
      reject(e);
      process.exit(1);
    }

    // 这块的 代码
    ForkTsCheckerWebpackPlugin
      .getCompilerHooks(compiler)
      .waiting.tap('awaitingTypeScriptCheck', () => {
        console.log(
          chalk.yellow(
            'Files successfully emitted, waiting for typecheck results...'
          )
        );
      });

    compiler.run((err, stats) => {
      err ? reject(err) : resolve(stats);
    });
  });
}
const build = async () => {

  try {
    const client = await compile(clientConfig)

    if (client) {
      message = client.toString({
        colors: true,
        children: false,
        chunks: false,
        modules: false,
        moduleTrace: false,
        warningsFilter: () => true,
      });
      console.log('client', message)
    }
  }
  catch (err) {
    console.log(err)
  }
}
build()


