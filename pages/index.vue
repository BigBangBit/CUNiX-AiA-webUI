<!-- eslint-disable no-console -->
<template>
  <v-card class="mt-5 mb-8">
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <p class="fixDiv">
              hoy es <strong>{{ $nuxt.$moment( Date.now() ).format("dddd DD MMMM YYYY [a las] HH:mm ") }}</strong>
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="5">
            <v-text-field v-model="tutor" rounded outlined label="Nombre Tutor *" />
          </v-col>
          <v-col cols="7">
            <v-text-field v-model="cliente" label="Nombre Cliente" />
            <v-btn depressed class="blue white--text">
              Nuevo Cliente
            </v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <vc-chatView :mensajes="mensajes" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field ref="inputPregunta" v-model="pregunta" label="Escriba la pregunta con serenidad... (Ctrl+Enter = Enviar)" />
            <v-btn depressed class="blue white--text" @click="clickAsk">
              enviar a la iA
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import AiShowQueryS from '~/components/AiShowQueryS'

export default {
  name: 'IndexPage',
  components: { 'vc-chatView': AiShowQueryS },
  data () {
    return {
      tutor: '',
      cliente: '',
      pregunta: '',
      preguntas: [],
      respuesta: '',
      mensajes: []
    }
  },
  mounted () {
    this.$refs.inputPregunta.$el.addEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    rePreguntar () {
      // $nuxt.$store.commit('openIChing')
      // Y ALGO MAS
    },
    handleKeyDown (event) {
      if (event.ctrlKey && event.key === 'Enter') {
        this.clickAsk()
      }
    },
    clickAsk () {
      // eslint-disable-next-line no-multi-spaces, brace-style
      if      (this.tutor === '')         { this.$dialog.warning({ text: 'Tutor no puede estar vacio', title: 'Advertencia' }) }
      // eslint-disable-next-line brace-style
      else if (this.pregunta.length < 23) { this.$dialog.warning({ text: 'Pregunta no puede tener menos de 22 caracteres', title: 'Advertencia' }) }
      else {
        const mensaje = {}

        mensaje.who = this.tutor
        mensaje.when = Date.now()
        mensaje.what = this.pregunta
        mensaje.forWho = this.cliente
        mensaje.respuesta = { }
        // mensaje.respuesta = { when: null, reponse: null, delay: null, rate: null }
        this.mensajes.push(mensaje)

        // eslint-disable-next-line no-console
        console.log(mensaje)
        this.pregunta = ''
      }
      // eslint-disable-next-line no-undef, no-console
      console.log('enviar mensaje a la ai')
    }

  }
}
</script>

<style>
  .borde-azul {
      border: 2px solid blue;
  }
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
