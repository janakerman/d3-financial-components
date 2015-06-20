(function(d3, fc) {
    'use strict';

    fc.series.stackedBar = function() {

        var decorate = fc.util.fn.noop,
            barWidth = fc.util.fractionalBarWidth(0.75),
            xScale = d3.time.scale(),
            yScale = d3.scale.linear(),
            // Implicitly dependent on the implementation of the stack layout's `out`.
            stackY0 = function(d, i) { return d.y0; },
            stackY = function(d, i) { return d.y; };

        var stackLayout = d3.layout.stack();

        var stackedBar = function(selection) {

            var bar = fc.series.bar()
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

                var series = container.selectAll('g.stacked-bar')
                    .data(layeredData)
                    .enter()
                    .append('g')
                    .attr('class', 'stacked-bar')
                    .call(bar);

                decorate(series);
            });
        };

        stackedBar.decorate = function(x) {
            if (!arguments.length) {
                return decorate;
            }
            decorate = x;
            return stackedBar;
        };
        stackedBar.barWidth = function(x) {
            if (!arguments.length) {
                return barWidth;
            }
            barWidth = x;
            return stackedBar;
        };
        stackedBar.xScale = function(x) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = x;
            return stackedBar;
        };
        stackedBar.yScale = function(x) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = x;
            return stackedBar;
        };
        stackedBar.stackY0 = function(x) {
            if (!arguments.length) {
                return stackY0;
            }
            stackY0 = x;
            return stackedBar;
        };
        stackedBar.stackY = function(x) {
            if (!arguments.length) {
                return stackY;
            }
            stackY = x;
            return stackedBar;
        };

        return fc.util.rebind(stackedBar, stackLayout, {
            xValue: 'x',
            yValue: 'y',
            out: 'out',
            offset: 'offset',
            values: 'values',
            order: 'order'
        });
    };
}(d3, fc));
