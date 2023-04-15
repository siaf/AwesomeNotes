import Chart from 'chart.js/auto';

class ChartBlock {
    static get toolbox() {
      return {
        title: 'Chart',
        icon: '<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="12" height="12" fill="#fff" stroke="#000"/><rect x="4" y="6" width="2" height="8" fill="#000"/><rect x="8" y="4" width="2" height="10" fill="#000"/><rect x="12" y="7" width="2" height="7" fill="#000"/></svg>'
      };
    }

    static get isReadOnlySupported() {
      return true;
    }

    static get sanitize() {
      return {
        data: {}
      };
    }

    renderSettings() {
      // This block doesn't have any additional settings
      return null;
    }

    save(blockContent) {
      // Save the chart data in the block's data property
      return {
        data: blockContent.innerHTML
      };
    }

    render() {
      // Render the block using Chart.js library
      const chartCanvas = document.createElement('canvas');
      const chartCtx = chartCanvas.getContext('2d');

      // Example chart data (you can replace this with user inputs)
      const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Dataset 1',
          data: [10, 20, 30, 40, 50, 60, 70],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      };

      new Chart(chartCtx, {
        type: 'bar',
        data: chartData,
        options: {}
      });

      // Add the canvas to the block content
      const blockContent = document.createElement('div');
      blockContent.appendChild(chartCanvas);

      return blockContent;
    }
  }

  export default ChartBlock;