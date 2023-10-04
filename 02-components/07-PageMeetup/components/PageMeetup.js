import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupDescription from '../../02-MeetupDescription/components/MeetupDescription.js';
import MeetupCover  from '../../03-MeetupCover/components/MeetupCover.js';
import MeetupInfo from '../../04-MeetupInfo/components/MeetupInfo.js'
import MeetupAgendaItem from '../../05-MeetupAgenda/components/MeetupAgendaItem.js';
import MeetupAgenda from '../../05-MeetupAgenda/components/MeetupAgenda.js';
import MeetupView from '../../06-MeetupView/components/MeetupView.js';

import { fetchMeetupById } from '../meetupService.js';
import { isError } from 'lodash';


export default defineComponent({
  name: 'PageMeetup',
  props: {
    meetupId: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      selectedMeetup: null,
      isError: false,
      errorMessage: '',
      isLoading: false
    }
  },
  components: {
    UiAlert,
    UiContainer,
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    MeetupAgendaItem,
    MeetupAgenda,
    MeetupView
  },
  watch: {
    meetupId: {
      immediate: true,
      async handler(newValue) {
        this.selectedMeetup = null;
        this.isLoading = true;
        try {
          const meetup = await fetchMeetupById(newValue);
          this.isLoading = false;
          this.isError = false;
          this.selectedMeetup = meetup;
        } catch(err) {
          this.isError = true;
          this.selectedMeetup = null;
          this.errorMessage = err.message;
        }
      }  
    }
  },
  async mounted() {
    this.isLoading = true;
    try {
      const meetup = await fetchMeetupById(this.meetupId);
      this.isLoading = false;
      this.selectedMeetup = meetup;
      
    } catch(err) {
      this.isError = true;
      this.errorMessage = err.message;
    }    
  },

  template: `
    <div class="page-meetup">

      <template v-if="!isError">

        <UiContainer v-if="isLoading">
          <UiAlert>Загрузка...</UiAlert>
        </UiContainer>

        <UiContainer v-if="selectedMeetup">
          <MeetupView :meetup="selectedMeetup"></MeetupView>
          <MeetupDescription :description="selectedMeetup.description"></MeetupDescription>
        </UiContainer>

      </template>

      <UiContainer v-else="isError">
        <UiAlert>{{ errorMessage }}</UiAlert>
      </UiContainer>

    </div>`,
});
