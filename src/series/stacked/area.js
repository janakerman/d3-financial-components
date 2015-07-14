(function(d3, fc) {
    'use strict';

    fc.series.stacked.area = function() {

        var decorate = fc.util.fn.noop;

        var area = fc.series.area()
            .yValue(function(d) { return d.y0 + d.y; })
            .y0Value(function(d) { return d.y0; });

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

        var stackedArea = function(selection) {
            selection.each(function(data) {

                var series = data.map(function() { return area; });

                multi.series(series);

                selection.call(multi);
            });
        };

        stackedArea.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return stackedArea;
        };

        fc.util.rebind(stackedArea, multi, {
            xScale: 'xScale',
            yScale: 'yScale'
        });

        return fc.util.rebind(stackedArea, area, {
            xValue: 'xValue',
            y0Value: 'y0Value',
            y1Value: 'y1Value',
            yValue: 'yValue'
        });
    };

}(d3, fc));
