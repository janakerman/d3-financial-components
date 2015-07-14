(function(d3, fc) {
    'use strict';

    fc.series.stacked.bar = function() {

        var bar = fc.series.bar()
            .yValue(function(d) { return d.y0 + d.y; })
            .y0Value(function(d) { return d.y0; });

        var multi = fc.series.multi()
            .mapping(function(series, i) {
                return this[i];
            });

        var stackedBar = function(selection) {

            selection.each(function(data) {

                var series = data.map(function() { return bar; });

                multi.series(series);

                selection.call(multi);
            });
        };

        fc.util.rebind(stackedBar, multi, {
            xScale: 'xScale',
            yScale: 'yScale',
            decorate: 'decorate'
        });

        return fc.util.rebind(stackedBar, bar, {
            xValue: 'xValue',
            y0Value: 'y0Value',
            y1Value: 'y1Value',
            yValue: 'yValue',
            barWidth: 'barWidth'
        });
    };

}(d3, fc));