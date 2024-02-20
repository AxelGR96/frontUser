<template>
  <div class="woodBackground">
  <v-container>
    <v-row class="text-center" style="margin-top:4rem;">
      <v-col cols="12">
        
       <!-- Avatar redondo con icono MDI -->
    <v-avatar size="x-large" color="blue-grey-darken-1" style="color:#546E7A">
      <v-icon color="black" size="200">mdi-account-tie</v-icon>
    </v-avatar>

    

      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Administración de Usuarios
        </h1>
      </v-col>


    </v-row>
  </v-container>
</div>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      message: null
    }),
    methods:{
      getData(){
        this.$axios.get("sendMessage")
        .then((response) => {
          this.message = response.data;
          console.log(response);
          console.log(this.message);
        })
        .catch((error) => {
          //   ////(error);
          console.log("errror:",error);
          this.$toast.error("Algo salio mal, favor de intentar mas tarde.");
        })
      }
    },
    mounted(){
      this.getData();
    }
  }
</script>

<style scoped>
.woodBackground{
  background-image: url('/src/assets/wood.jpg');
  /* Ajusta la configuración de la imagen de fondo según tus necesidades */
  background-size: cover; /* Ajusta el tamaño de la imagen para cubrir todo el componente */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
  background-position: center; /* Centra la imagen en el componente */
  /* Opcional: añade otros estilos como color de texto, márgenes, etc. */
  height: 100vh; /* Ocupa el 100% de la altura de la ventana */
}
</style>
