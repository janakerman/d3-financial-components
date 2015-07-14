(function(d3, fc) {
    'use strict';

    fc.series.stacked.line = function() {

        var decorate = fc.util.fn.noop;

        var line = fc.series.line()
            .yValue(function(d) { return d.y0 + d.y; });

        var multi = fc.series.multi()
            .mapping(function(series, i) {
                return this[i];
            })
            .decorate(function(selection) {
                selection.classed('stacked', true);

                if (decorate) {
                    decorate(selection);
                }
            });

        var stackedLine = function(selection) {

            selection.each(function(data) {

                var series = data.map(function() { return line; });

                multi.series(series);

                selection.call(multi);
            });
        };

        stackedLine.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return stackedLine;
        };

        fc.util.rebind(stackedLine, multi, {
            xScale: 'xScale',
            yScale: 'yScale'
        });

        return fc.util.rebind(stackedLine, line, {
            xValue: 'xValue',
            yValue: 'yValue'
        });
    };

}(d3, fc));
