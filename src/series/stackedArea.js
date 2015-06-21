(function(d3, fc) {
    'use strict';

    fc.series.stackedArea = function() {

        var decorate = fc.util.fn.noop,
            xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            // Implicitly dependent on the implementation of the stack layout's `out`.
            stackY0 = function(d, i) { return d.y0; },
            stackY = function(d, i) { return d.y; };

        var stackLayout = d3.layout.stack();

        var stackedArea = function(selection) {

            var area = fc.series.area()
                .xScale(xScale)
                .yScale(yScale)
                .xValue(stackLayout.x())
                .yValue(function(d) { return stackY0(d) + stackY(d); })
                .y0Value(stackY0);

            selection.each(function(data) {

                var layers = stackLayout(data);

                var container = d3.select(this);

                // Pull data from series objects.
                var layeredData = layers.map(stackLayout.values());

                var series = container.selectAll('g.stacked-area')
                    .data(layeredData)
                    .enter()
                    .append('g')
                    .attr('class', 'stacked-area')
                    .call(area);

                decorate(series);
            });
        };

        stackedArea.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return stackedArea;
        };
        stackedArea.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return stackedArea;
        };
        stackedArea.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return stackedArea;
        };
        stackedArea.stackY0 = function(x) {
            if (!arguments.length) {
                return stackY0;
            }
            stackY0 = x;
            return stackedArea;
        };
        stackedArea.stackY = function(x) {
            if (!arguments.length) {
                return stackY;
            }
            stackY = x;
            return stackedArea;
        };

        return fc.util.rebind(stackedArea, stackLayout, {
            xValue: 'x',
            yValue: 'y',
            out: 'out',
            offset: 'offset',
            values: 'values',
            order: 'order'
        });
    };
}(d3, fc));
