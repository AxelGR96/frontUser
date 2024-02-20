<template>
    <div style="background-color: #234663; height: 100%">
    <v-main style="height: 100%">
      <v-container fluid class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" md="4">
            <v-card class="elevation-12">
              <v-card-title
                height="150px"
                class="background justify-center"
                style="background-color: #326793"
              >
              <v-icon size="100">mdi-account</v-icon>
              </v-card-title>

              <v-form>
                <v-card-text>
                  <v-text-field
                    label="Usuario"
                    name="username"
                    v-model="username"
                    prepend-icon="mdi-account"
                    autofocus
                    autocomplete="new-password"
                  />

                  <v-text-field
                    label="Contraseña"
                    v-model="password"
                    type="password"
                    name="password"
                    prepend-icon="mdi-key"
                    autocomplete="new-password"
                  />
                </v-card-text>
                <v-card-actions v-if="$vuetify.breakpoint.smAndUp">
                  
                    <v-spacer />
                  <v-btn color="primary" @click="login"> Iniciar sesión </v-btn>
                </v-card-actions>

                 <v-card-actions v-if="$vuetify.breakpoint.mobile">
                  
                    <v-spacer />
                  <v-btn color="primary" @click="login" type="submit"> Iniciar sesión </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

  </div>
</template>


<script>
export default {
    name: "login",
    data: () => ({
        username: null,
        password: null,

    }),
    methods:{
        login(){
            console.log(this.username);
            console.log(this.password);
            this.$axios
          .post("login", {
            email: this.username,
            password: this.password,
          })
          .then((response) => {
            const token = response.data.token;
            const user = response.data.user;
            // Almacenar el token JWT en localStorage o en una cookie
            localStorage.setItem("token", token);
            console.log("token",token);
            // Redirigir al usuario a una página después del inicio de sesión
            this.$router.push({ name: "Layout",params: {data: user} });
          })
          .catch(() => {
            ////(error);
            
          })
          .finally(() => {
            
          });
            //this.$router.push({ name: "Layout" });
        }
    }
}
</script>