(function(d3, fc) {
    'use strict';

    fc.series.stacked.bar = function() {

        var bar = fc.series.bar()
            .yValue(function(d) { return d.y0 + d.y; })
            .y0Value(function(d) { return d.y0; });

        var stackedBar = function(selection) {

            var numSeries = selection.datum().length;

            var series = Array.apply(null, new Array(numSeries))
                .map(function() { return bar; });

            var multi = fc.series.multi()
                .series(series)
                .mapping(function(series, i) {
                    return this[i];
                });

            selection.call(multi);
        };

        return fc.util.rebind(stackedBar, bar, {
            decorate: 'decorate',
            xScale: 'xScale',
            yScale: 'yScale',
            xValue: 'xValue',
            y0Value: 'y0Value',
            y1Value: 'y1Value',
            yValue: 'yValue',
            barWidth: 'barWidth'
        });
    };

}(d3, fc));