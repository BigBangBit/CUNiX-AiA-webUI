import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
//added
import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'

Vue.use(Vuetify, {
  theme: {
    primary   : '#131313', // a color that is not in the material colors palette
    accent    : colors.grey.darken3,
    secondary : colors.amber.darken3,
    info      : colors.teal.lighten1,
    warning   : colors.amber.base,
    error     : colors.deepOrange.accent4,
    success   : colors.green.accent3
  }
})

Vue.use(VuetifyDialog)

//Vue.prototype.$dialog = new VuetifyDialog(Vue);
