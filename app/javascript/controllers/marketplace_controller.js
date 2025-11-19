import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "buySpace", "buyDuration", "buyBudget", "buyRequirements",
    "sellSpace", "sellPrice", "sellLocation", "sellType", "offersGrid"
  ]

  connect() {
    this.offers = [
      { id: 1, type: 'sell', space: 50, price: 0.008, location: '🇧🇷 Brasil', storage: '💿 SSD', provider: 'Provider #A7F3' },
      { id: 2, type: 'sell', space: 100, price: 0.012, location: '🇪🇺 Europa', storage: '⚡ NVMe', provider: 'Provider #B2K9' },
      { id: 3, type: 'buy', space: 25, budget: 0.15, duration: 3, buyer: 'Buyer #C5X1' },
      { id: 4, type: 'sell', space: 200, price: 0.009, location: '🇺🇸 EUA', storage: '💿 SSD', provider: 'Provider #D8M4' },
      { id: 5, type: 'buy', space: 75, budget: 0.5, duration: 12, buyer: 'Buyer #E1P7' }
    ];
    this.renderOffers();
  }

  buy(event) {
    event.preventDefault();
    this.offers.push({
      id: this.offers.length + 1,
      type: 'buy',
      space: parseInt(this.buySpaceTarget.value),
      budget: parseFloat(this.buyBudgetTarget.value),
      duration: parseInt(this.buyDurationTarget.value),
      buyer: 'Buyer #' + Math.random().toString(36).substr(2, 4).toUpperCase()
    });
    this.renderOffers();
    this.showNotification('🎉 Sua solicitação foi publicada no marketplace!');
    event.target.reset();
  }

  sell(event) {
    event.preventDefault();
    this.offers.push({
      id: this.offers.length + 1,
      type: 'sell',
      space: parseInt(this.sellSpaceTarget.value),
      price: parseFloat(this.sellPriceTarget.value),
      location: this.sellLocationTarget.options[this.sellLocationTarget.selectedIndex].text,
      storage: this.sellTypeTarget.options[this.sellTypeTarget.selectedIndex].text,
      provider: 'Provider #' + Math.random().toString(36).substr(2, 4).toUpperCase()
    });
    this.renderOffers();
    this.showNotification('🎉 Sua oferta foi publicada no marketplace!');
    event.target.reset();
  }

  renderOffers() {
    this.offersGridTarget.innerHTML = '';
    this.offers.forEach((offer, index) => {
      const card = document.createElement('div');
      card.className = 'offer-card';
      card.style.animationDelay = (index * 0.1) + 's';
      if (offer.type === 'sell') {
        card.innerHTML = `
          <div class="offer-header">
            <span class="offer-type">🏪 VENDA</span>
            <div class="offer-status"></div>
          </div>
          <div class="offer-details">
            <div class="offer-detail"><strong>👤 Provedor:</strong> ${offer.provider}</div>
            <div class="offer-detail"><strong>📦 Espaço:</strong> ${offer.space} GB</div>
            <div class="offer-detail"><strong>💰 Preço:</strong> ${offer.price} ETH/GB/mês</div>
            <div class="offer-detail"><strong>🌍 Local:</strong> ${offer.location}</div>
            <div class="offer-detail"><strong>⚡ Tipo:</strong> ${offer.storage}</div>
            <button class="accept-btn" data-action="click->marketplace#acceptOffer" data-offer-id="${offer.id}" data-offer-type="sell">✅ Aceitar Oferta</button>
          </div>
        `;
      } else {
        card.innerHTML = `
          <div class="offer-header">
            <span class="offer-type">🛒 COMPRA</span>
            <div class="offer-status"></div>
          </div>
          <div class="offer-details">
            <div class="offer-detail"><strong>👤 Comprador:</strong> ${offer.buyer}</div>
            <div class="offer-detail"><strong>📦 Busca:</strong> ${offer.space} GB</div>
            <div class="offer-detail"><strong>💰 Orçamento:</strong> ${offer.budget} ETH</div>
            <div class="offer-detail"><strong>📅 Duração:</strong> ${offer.duration} meses</div>
            <button class="accept-btn" data-action="click->marketplace#acceptOffer" data-offer-id="${offer.id}" data-offer-type="buy">🤝 Fazer Proposta</button>
          </div>
        `;
      }
      this.offersGridTarget.appendChild(card);
    });
  }

  acceptOffer(event) {
    const type = event.target.getAttribute('data-offer-type');
    this.showNotification(type === 'sell' ? '✅ Negociação iniciada com provedor!' : '✅ Proposta enviada ao comprador!');
  }

  showNotification(message) {
    const notification = document.querySelector('[data-controller="notification"]');
    if (notification && notification.show) {
      notification.show(message);
    } else {
      // fallback para mostrar texto
      notification.textContent = message;
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
      }, 3000);
    }
  }
}
