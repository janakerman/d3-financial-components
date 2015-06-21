(function(d3, fc) {
    'use strict';

    fc.series.stackedLine = function() {

        var decorate = fc.util.fn.noop,
            xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            // Implicitly dependent on the implementation of the stack layout's `out`.
            stackY0 = function(d, i) { return d.y0; },
            stackY = function(d, i) { return d.y; };

        var stackLayout = d3.layout.stack();

        var stackedLine = function(selection) {

            var line = fc.series.line()
                .xScale(xScale)
                .yScale(yScale)
                .xValue(stackLayout.x())
                .yValue(function(d) { return stackY0(d) + stackY(d); })

            selection.each(function(data) {

                var layers = stackLayout(data);

                var container = d3.select(this);

                // Pull data from series objects.
                var layeredData = layers.map(stackLayout.values());

                var series = container.selectAll('g.stacked-line')
                    .data(layeredData)
                    .enter()
                    .append('g')
                    .attr('class', 'stacked-line')
                    .call(line);

                decorate(series);
            });
        };

        stackedLine.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return stackedLine;
        };
        stackedLine.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return stackedLine;
        };
        stackedLine.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return stackedLine;
        };
        stackedLine.stackY0 = function(x) {
            if (!arguments.length) {
                return stackY0;
            }
            stackY0 = x;
            return stackedLine;
        };
        stackedLine.stackY = function(x) {
            if (!arguments.length) {
                return stackY;
            }
            stackY = x;
            return stackedLine;
        };

        return fc.util.rebind(stackedLine, stackLayout, {
            xValue: 'x',
            yValue: 'y',
            out: 'out',
            offset: 'offset',
            values: 'values',
            order: 'order'
        });
    };
}(d3, fc));
