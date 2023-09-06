<template>
  <!--
    Componente "AiShowQueryS" ...
    Muestra en un chat de mensajes[]

    Autor           : Mike tossutti <miguel.vides@cunix.net>
    Last Update     : 2022.08.30 : reFactoring
    Cration Date    : 2018.08.03
    -->
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card
          max-height="400px"
          style="overflow-y: auto;"
        >
          <v-list>
            <v-list-item>
              <v-list-item-content class="align-end">
                <v-list-item-title>
                  <img src="/bot-image.png" width="40" height="40">
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-col cols="12">
                    <p>
                      {{ saludo }} <br>
                      <strong>{{ $nuxt.$moment(new Date(ahora) ).toNow() }}</strong>
                    </p>
                  </v-col>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item-group v-for="msg in mensajes" :key="msg.when">
              <v-list-item>
                <!-- human -->
                <v-list-item-content>
                  <v-list-item-title>
                    <img src="/usericon.png" width="40" height="40">
                    {{ msg.who }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <v-col cols="12">
                      <p>
                        {{ msg.what }} <br>
                        <strong>{{ $nuxt.$moment(new Date(msg.when) ).toNow() }}</strong>
                      </p>
                    </v-col>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <!-- Ai -->
                <v-list-item-content class="align-end">
                  <v-list-item-title>
                    <img src="/bot-image.png" width="40" height="40">
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <v-card-text v-if="(msg && msg.respuesta && 'response' in msg.respuesta) ? true : (fetchAiResponce(msg) && false)">
                      <v-col cols="12">
                        <p>
                          {{ msg.respuesta.response.text }} <br>
                          <strong>{{ $nuxt.$moment(new Date(msg.respuesta.when) ).toNow() }}</strong>
                        </p>
                        <v-expansion-panels>
                          <v-expansion-panel
                            v-for="(fuente,i) in msg.respuesta.response.sourceDocuments"
                            :key="i"
                          >
                            <v-expansion-panel-header>
                              Fuente {{ i +1 }}
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <v-col cols="12">
                                {{ fuente.pageContent }}
                                <p>
                                  {{ fuente.metadata.source }} <br>
                                  <strong> Pagina {{ fuente.metadata["loc.pageNumber"] }} de {{ fuente.metadata["pdf.totalPages"] }} linea {{ fuente.metadata["loc.lines.from"] }} a la {{ fuente.metadata["loc.lines.to"] }}</strong>
                                  <br> Autor <strong> {{ fuente.metadata["pdf.info.Author"] }}</strong>
                                </p>
                              </v-col>
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </v-col>
                    </v-card-text>
                    <p v-else>
                      Buscando...Pesando...y Prosesando
                    </p>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    // With options with type field
    mensajes: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      saludo: 'Buen dia, en que te ayudo hoy ?',
      ahora: Date.now()
    }
  },
  computed: {
    isDone (m) {
      return (m && m.respuesta && 'response' in m.respuesta) ? true : (this.fetchAiResponce(m) && false)
    }
  },
  mounted: function () {
    console.log('Numero de consultas :' + this.mensajes.length)
  },
  methods: {
    async fetchAiResponce (msg) {
      if (msg && msg.respuesta && 'when' in msg.respuesta) {
        console.log('msg con respuesta :')
        console.log(msg.respuesta)
      } else {
        try {
          const data = {
            question: msg.what,
            history: []
          }
          const headers = { 'Content-Type': 'application/json' }

          msg.respuesta.response = await this.$axios.$post('http://localhost:3000/api/chat', data, { headers })
          // Hacer algo con la respuesta si es necesario
          msg.respuesta.when = Date.now()
          msg.respuesta.isOk = true
          console.log('call ai ok:', msg.respuesta.response)
          this.$forceUpdate()
        } catch (error) {
        // Hacer algo con el ERROR
          msg.respuesta.when = Date.now()
          msg.respuesta.isOk = false
          msg.respuesta.response = {}
          msg.respuesta.response.text = 'algo salio mal, gracias por tu comprencion.'
          console.error('call ai Error:', error)
          this.$forceUpdate()
        }
      }
      //  this.respuesta =
    } // ,

  }
}
</script>

<style>
  .TextWarpRigth{
    text-align        : right;
    margin            : 10 px;
    padding           : 10 px;
  }
  .TextWarpLeft{
    text-align        : Left;
    margin            : 10 px;
    padding           : 10 px;
  }
  .fixDiv {
    display           : inline;
    text-align        : center;
    vertical-align    : middle;
  }
  .fixText {
    position          : absolute;
    text-align        : center;
    vertical-align    : middle;
  }
</style>
