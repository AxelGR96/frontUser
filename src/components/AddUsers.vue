<template>
    <div>
        <v-container>
            <v-row class="text-center">
                <v-col cols="12" md="8">
                    <v-card>
                        <v-app-bar dark style="color:#80DEEA">
                            <v-toolbar-title class="title font-weight-light">
                                <v-avatar size="50">
                                <v-icon>mdi-account-plus-outline</v-icon>
                                </v-avatar>
                                <span class="mt-1" style="font-size: 22px"> Crear nuevo usuario</span>
                            </v-toolbar-title>
                        </v-app-bar>

                        <v-card-text>
                            <v-container>
                                <v-list>
                                    <v-form ref="form">
                                    <v-row justify="center">
                                        <v-col cols="12" md="4">
                                            <v-list-item-content>                                                
                                                <v-list-item-subtitle class="body-1" style="color: black">
                                                    <v-text-field
                                                    v-model="user.name"
                                                    :rules="nameRules"
                                                    required
                                                    class="mt-2"
                                                    label="Nombre del Usuario"
                                                    outlined
                                                ></v-text-field>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-list-item-content>
                                                <v-list-item-subtitle class="body-1" style="color: black">
                                                    <v-text-field
                                                    v-model="user.lastname"
                                                    :rules="lastnameRules"
                                                    required
                                                    class="mt-2"
                                                    label="Apellidos(s)"
                                                    outlined
                                                ></v-text-field>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-list-item-content>
                                                <v-list-item-subtitle class="body-1" style="color: black">
                                                    <span class="body-1 font-weight-bold" style="color: black;">Sexo</span>
                                                    <br/>
                                                    <v-btn-toggle
                                                    v-model="user.gender"
                                                    rounded
                                                    color="primary"
                                                    dense
                                                    mandatory
                                                >
                                                    <v-btn :value="1">
                                                    <v-icon left>mdi-human-male</v-icon>
                                                    Hombre
                                                    </v-btn>
                                                    <v-btn :value="2">
                                                    <v-icon left>mdi-human-female</v-icon>
                                                    Mujer
                                                    </v-btn>
                                                </v-btn-toggle>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-list-item-content>
                                                <v-list-item-subtitle class="body-1" style="color: black">
                                                    <v-text-field
                                                    v-model="user.email"
                                                    :rules="emailRules"
                                                    required
                                                    class="mt-2"
                                                    label="Email"
                                                    outlined
                                                ></v-text-field>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-col>


                                        <v-col cols="12" md="4">
                                            <v-list-item-content>
                                                <v-list-item-subtitle class="body-1" style="color: black">
                                                    <v-text-field
                                                    v-model="user.age"
                                                    :rules="ageRules"
                                                    required
                                                    class="mt-2"
                                                    label="Edad"
                                                    outlined
                                                    type="number"
                                                ></v-text-field>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-col>

                                        <v-col cols="12" md="4">
                                            <v-list-item-content>
                                                <v-list-item-subtitle class="body-1" style="color: black">
                                                    <v-text-field
                                                    v-model="user.password"
                                                    :rules="passwordRules"
                                                    required
                                                    class="mt-2"
                                                    label="Contraseña"
                                                    outlined
                                                    type="password"
                                                ></v-text-field>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-col>
                                        
                                    </v-row>
                                </v-form>
                                </v-list>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" dark @click="sendUser()">Crear Usuario</v-btn>
            </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-col cols="12" md="6">
                    <v-snackbar v-model="successSnackbar" color="success" bottom>
                    <span class="text-h3">Operación exitosa!</span>
                    <v-btn text @click="successSnackbar = false">Cerrar</v-btn>
                    </v-snackbar>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-col cols="12" md="6">
                    <v-snackbar v-model="errorSnackbar" color="success" bottom>
                    <span class="text-h3">Operación Erronea!</span>
                    <v-btn text @click="errorSnackbar = false">Cerrar</v-btn>
                    </v-snackbar>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "AddUsers",
    data: () => ({
        search: "",
        successSnackbar: false,
        errorSnackbar: false,
        nameRules: [
                value => !!value || 'Nombre del usuario es requerido', // Verifica si el campo está vacío
                value => (value && value.length <= 50) || 'Máximo 50 caracteres' // Verifica si el campo tiene más de 50 caracteres
            ],
        lastnameRules: [
                value => !!value || 'Apellidos son requeridos',
                value => (value && value.length <= 50) || 'Máximo 50 caracteres'
            ],
        emailRules: [
                value => !!value || 'Email es requerido',
                value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Dirección de correo electrónico no válida'
            ],
        ageRules: [
                value => !!value || 'Edad es requerida',
                value => !isNaN(parseFloat(value)) && isFinite(value) || 'Por favor, ingresa un número válido'
            ],
        passwordRules: [
                value => !!value || 'Contraseña es requerida',
                value => (value && value.length >= 8) || 'La contraseña debe tener al menos 8 caracteres',
            ],
        user:{
            name: null,
            lastname: null,
            gender: null,
            email: null,
            age: null,
            password: null
        },
    }),
    methods:{
        sendUser(){
        this.$axios.post("createNewUser", {
          userData: this.user
        })
        .then(() => {
        })
        .catch((error) => {
            console.log(error);
            errorSnackbar = true;
          
        })
        .finally(() => {
          console.log("Exito");
          this.$refs.form.reset();
          this.successSnackbar = true;
          
        });
        }
    }
}
</script>