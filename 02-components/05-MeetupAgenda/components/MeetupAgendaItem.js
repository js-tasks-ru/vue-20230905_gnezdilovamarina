import { defineComponent } from '../vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from '../meetupService.js';
import { meanBy, method } from 'lodash';


export default defineComponent({
  name: 'MeetupAgendaItem',
  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  computed: {
    typeIcon() {
      const key = this.agendaItem.type;
      return agendaItemIcons[key]
    },
    title() {
      return this.agendaItem.title ?? agendaItemDefaultTitles[this.agendaItem.type]
    }
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
      <img :src="'../../../src/assets/icons/icon-' + typeIcon  + '.svg'" class="icon" alt="key" />
      </div>
      <div class="agenda-item__col">{{agendaItem.startsAt}} - {{agendaItem.endsAt}}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ title }}</h3>
        <p v-if="agendaItem.type === 'talk'" class="agenda-item__talk">
          <span>{{agendaItem.speaker}}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang"> {{agendaItem.language}} </span>
        </p>
        <p v-if="agendaItem.description"> {{ agendaItem.description }}</p>
      </div>
    </div>`,
});

