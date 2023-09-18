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

  data() {
    return {
      Icons: agendaItemIcons

    }
  },

  methods: {
    setTypeIcon() {
      const key = this.agendaItem.type;
      return agendaItemIcons[key]
    },
    setTitle() {
      let title
      if(this.agendaItem.title) {
        title = this.agendaItem.title
        return title
      } else {
        const key = this.agendaItem.type;
        title = agendaItemDefaultTitles[key]
        return title
      }
    }
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
      <img :src="'../../../src/assets/icons/icon-' + setTypeIcon()  + '.svg'" class="icon" alt="key" />
      </div>
      <div class="agenda-item__col">{{agendaItem.startsAt}} - {{agendaItem.endsAt}}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ setTitle() }}</h3>
        <p class="agenda-item__talk">
          <span v-if="agendaItem.type === 'talk'">{{agendaItem.speaker}}</span>
          <span v-if="agendaItem.type === 'talk'" class="agenda-item__dot"></span>
          <span v-if="agendaItem.type === 'talk'" class="agenda-item__lang"> {{agendaItem.language}} </span>
        </p>
        <p v-if="agendaItem.description"> {{ agendaItem.description }}</p>
      </div>
    </div>`,
});

