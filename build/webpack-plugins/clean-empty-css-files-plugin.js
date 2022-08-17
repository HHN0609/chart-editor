const PLUGINNAME = 'CleanEmptyCssFilesPlugin';
const cssPattern = /\.css$/;
/**
 * Only can be used in production mode!!!!
 */
class CleanEmptyCssFilesPlugin {
    apply(compiler){
        compiler.hooks.shouldEmit.tap(PLUGINNAME, ( compilation ) => {
            // 其实为了更好的性能，可以在compilation的钩子里做这个事情，但是在compiler里做比较方便直接
            const cssFiles = compilation.getAssets().filter(({name}) => {
                return cssPattern.test(name); 
            });
            // console.log(cssFiles);
            cssFiles.forEach((asset) => {
                if(asset.source._source._value === '' || asset.source._source._valueAsString === ''){
                    compilation.deleteAsset(asset.name);
                }
            });
            return true;
        })
    }
}

module.exports = CleanEmptyCssFilesPlugin;