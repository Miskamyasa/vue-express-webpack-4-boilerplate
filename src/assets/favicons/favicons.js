const faviconsContext = require.context("!!file-loader?name=assets/favicons/[name].[ext]!.", true, /\.(svg|png|ico)$/);
faviconsContext.keys().forEach(faviconsContext);
