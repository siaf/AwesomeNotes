class SwotBlock {
    static get toolbox() {
      return {
        title: 'SWOT Block',
        icon: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.05L3.53 6.81l1.94 3.36L12 4.78l6.53 5.39 1.94-3.36L12 2.05zm0 3.24l3.88 2.28-3.88 3.2-3.88-3.2 3.88-2.28zm-5.5 5.5l1.5 2.6 2.5-1.5-1.5-2.6-2.5 1.5zm11.5 0l-1.5-2.6-2.5 1.5 1.5 2.6 2.5-1.5zm-11.5 6.5l1.5 2.6 2.5-1.5-1.5-2.6-2.5 1.5zm11.5 0l-1.5-2.6-2.5 1.5 1.5 2.6 2.5-1.5z"/></svg>'
      };
    }

    constructor({ data }) {
      this.data = data || {
        strength: '',
        weakness: '',
        opportunity: '',
        threat: ''
      };
    }

    static get isReadOnlySupported() {
  return true;
}

    render() {
      const container = document.createElement('div');

      const strengthInput = document.createElement('input');
      strengthInput.setAttribute('type', 'text');
      strengthInput.setAttribute('placeholder', 'Strength');
      strengthInput.addEventListener('input', () => {
        this.data.strength = strengthInput.value;
        this._updateSVG(container, this.data);
      });

      const weaknessInput = document.createElement('input');
      weaknessInput.setAttribute('type', 'text');
      weaknessInput.setAttribute('placeholder', 'Weakness');
      weaknessInput.addEventListener('input', () => {
        this.data.weakness = weaknessInput.value;
        this._updateSVG(container, this.data);
      });

      const opportunityInput = document.createElement('input');
      opportunityInput.setAttribute('type', 'text');
      opportunityInput.setAttribute('placeholder', 'Opportunity');
      opportunityInput.addEventListener('input', () => {
        this.data.opportunity = opportunityInput.value;
        this._updateSVG(container, this.data);
      });

      const threatInput = document.createElement('input');
      threatInput.setAttribute('type', 'text');
      threatInput.setAttribute('placeholder', 'Threat');
      threatInput.addEventListener('input', () => {
        this.data.threat = threatInput.value;
        this._updateSVG(container, this.data);
      });

      container.appendChild(strengthInput);
      container.appendChild(weaknessInput);
      container.appendChild(opportunityInput);
      container.appendChild(threatInput);

      this.svgContainer = document.createElement('div');
      container.appendChild(this.svgContainer);

      this._updateSVG(container, this.data);

      return container;
    }

    _updateSVG(container, data) {
      const svg = `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="100" height="100" fill="#6CBEEB"/>
      <rect x="100" y="0"width="100" height="100" fill="#FDB813"/>
<rect x="0" y="100" width="100" height="100" fill="#E94B3C"/>
<rect x="100" y="100" width="100" height="100" fill="#9ACD32"/>
  <text x="10" y="60" font-size="10" fill="white">${data.strength}</text>
  <text x="110" y="60" font-size="10" fill="white">${data.weakness}</text>
  <text x="10" y="160" font-size="10" fill="white">${data.opportunity}</text>
  <text x="110" y="160" font-size="10" fill="white">${data.threat}</text>
</svg>
`;

      this.svgContainer.innerHTML = svg;
    }

    save() {
      console.log(this.data);
      return this.data;
    }
  }

  export default SwotBlock;