import React from 'react';
import PropTypes from 'prop-types';

class PieComponent extends React.Component {
  constructor(props) {
    super(props);
    this.d3run = this.d3run.bind(this);
  }

  componentDidMount() {
    this.d3run();
  }

  componentDidUpdate() {
    this.d3run();
  }

  d3run() {
    const { _id, choiceArr, voteSum } = this.props;

    const svg = d3.select(`#pie${_id}`);
    const width = +svg.attr('width');
    const height = +svg.attr('height');
    const radius = width / 4;

    svg.selectAll('*').remove();

    const pie = d3.pie().value(d => d.voteCount);

    const piedata = pie(choiceArr);

    const fader = color => d3.interpolateRgb(color, '#fff')(0.2);
    const color = d3.scaleOrdinal(d3.schemeCategory10.map(fader));

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius - 7);

    // Create svg g element
    const gElement = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Tick marks
    const ticks = gElement
      .selectAll('line')
      .data(piedata)
      .enter()
      .append('line');

    ticks
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', -radius + 10)
      .attr('y2', d => {
        if (d.data.voteCount && d.data.voteCount * 100 / voteSum >= 5) {
          return -radius - 20;
        }
        return -radius + 10;
      })
      .attr(
        'transform',
        d => `rotate(${(d.startAngle + d.endAngle) / 2 * (180 / Math.PI)})`,
      );

    // Labels
    const labels = gElement
      .selectAll('text')
      .data(piedata)
      .enter()
      .append('text');

    labels
      .attr('class', 'label')
      .attr('transform', d => {
        const dist = radius + 50;
        const angle = (d.startAngle + d.endAngle) / 2; // Middle of wedge
        const x = dist * Math.sin(angle);
        const y = -dist * Math.cos(angle);
        return `translate(${x}, ${y})`;
      })
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .text(d => {
        if (d.data.voteCount && d.data.voteCount * 100 / voteSum >= 5) {
          return `${
            d.data.choiceName.length > 14
              ? `${d.data.choiceName.substring(0, 11)}...`
              : d.data.choiceName
          }`;
        }
        return null;
      });

    // Piechart
    const path = gElement
      .selectAll('path')
      .data(piedata)
      .enter()
      .append('path')
      .attr('fill', (d, i) => color(i))
      .attr('d', arc);

    // Values
    const values = gElement
      .append('g')
      .selectAll('text')
      .data(piedata)
      .enter()
      .append('text');

    values
      .attr('class', 'value')
      .attr('transform', d => {
        const dist = radius - 20;
        const angle = (d.startAngle + d.endAngle) / 2; // Middle of wedge
        const x = dist * Math.sin(angle);
        const y = -dist * Math.cos(angle);
        return `translate(${x}, ${y})`;
      })
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .text(d => `${d.data.voteCount}`);

    d3.select(`#tooltip${_id}`).remove();

    const tooltip = d3
      .select('body')
      .append('div')
      .attr('id', `tooltip${_id}`)
      .attr('class', 'tooltip')
      .style('opacity', 0);

    path
      .on('mouseover', d => {
        tooltip
          .transition()
          .duration(100)
          .style('opacity', 0.9);
        tooltip
          .html(
            `${d.data.choiceName}<br/>Votes: ${d.data.voteCount} (${+(
              d.data.voteCount *
              100 /
              voteSum
            ).toFixed(2)}%)`,
          )
          .style('left', `${d3.event.pageX + 10}px`)
          .style('top', `${d3.event.pageY - 40}px`)
          .attr('data-value', d.data.voteCount);
      })
      .on('mouseout', () => {
        tooltip
          .transition()
          .duration(100)
          .style('opacity', 0);
      });
  }

  render() {
    const { _id } = this.props;
    return <svg className="Svg" id={`pie${_id}`} width="350" height="300" />;
  }
}

PieComponent.propTypes = {
  _id: PropTypes.string.isRequired,
  choiceArr: PropTypes.arrayOf(
    PropTypes.shape({
      choiceName: PropTypes.string.isRequired,
      voteCount: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  voteSum: PropTypes.number.isRequired,
};

export default PieComponent;
