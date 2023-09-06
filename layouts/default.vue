<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-btn
            icon
            @click.stop="miniVariant = !miniVariant"
          >
            <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
          </v-btn>
          <v-btn
            icon
            @click.stop="clipped = !clipped"
          >
            <v-icon>mdi-application</v-icon>
          </v-btn>
          <v-btn
            icon
            @click.stop="fixed = !fixed"
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
      light
      height="400px"
    >
      <v-layout align-center column justify-center>
        <div style="position:absolute; width: 100%; height: 360px;">
          <center>
            <img src="https://www.cunix.net/wp-content/uploads/2016/04/logo.png" style="float: center;">
            <span style="font-size: 120%; color: black; ">
              <div style=" position: relative; top: 60px;  background-color: white; opacity: 0.61; width: 88%">
                © 2002 - {{ new Date().getFullYear() }} Todos los derechos reservados. Cunix ® es una marca registrada.<br>
                Toda la información proporcionada por este sistema es solo para fines de entrenamiento.<br>
                <strong>Proyecto en face Beta, Testing.</strong><br>
                Sea paciente con los resultados<br>
                Creado por <a href="http://cunix.net" style="white"> cunix.net &copy; {{ new Date().getFullYear() }}</a>
              </div>
            </span>
          </center>
        </div>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Bienvenido',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspirate',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'CUNiX App, Asistente de iA para Chatear con PDFs'
    }
  }
}
</script>
