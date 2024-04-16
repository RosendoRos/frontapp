import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Pressable, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';

type Props = {
  navigation: StackNavigationProp<any>;
};

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await axios.post('https://apisapp-1.onrender.com/register', {
        username,
        password,
      });

      if (response.status === 200) {
        console.log('Registro exitoso');
        // Redirigir a la pantalla de inicio de sesión
        setIsRegistering(false);
      } else {
        console.error('Error al registrarse:', response.data.message);
        // Alertar al usuario sobre el error de registro (opcional)
      }
    } catch (error) {
      console.error('Error al realizar la solicitud de registro:', error);
      // Manejar errores de red con elegancia (opcional)
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://apisapp-1.onrender.com/login', {
        username,
        password,
      });

      if (response.status === 200) {
        console.log('Inicio de sesión exitoso');
        // Guarde la respuesta del servidor para su uso posterior (por ejemplo, ID de usuario)
        // En este ejemplo, redirigimos a InfoScreen sin usar almacenamiento seguro
        navigation.navigate('InfoScreen');
      } else {
        console.error('Error al iniciar sesión:', response.data.message);
        // Alertar al usuario sobre credenciales inválidas (opcional)
      }
    } catch (error) {
      console.error('Error al realizar la solicitud de inicio de sesión:', error);
      // Manejar errores de red con elegancia (opcional)
    }
  };

  return (
    <ImageBackground source={require('./assets/img/1.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: 'white' }]}>Bienvenidos a UrbanAgroBot</Text>

        {/* Botón de registro/inicio de sesión */}
        <View style={styles.formContainer}>
          {isRegistering ? (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                onChangeText={setUsername}
                value={username}
                placeholderTextColor="gray" // Cambia el color del texto de placeholder
              />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
                placeholderTextColor="gray" // Cambia el color del texto de placeholder
              />
              <Pressable style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerButtonText}>Registrarse</Text>
              </Pressable>
              <Pressable style={styles.loginButton} onPress={() => setIsRegistering(false)}>
                <Text style={styles.loginButtonText}>Iniciar sesión</Text>
              </Pressable>
            </View>
          ) : (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                onChangeText={setUsername}
                value={username}
                placeholderTextColor="black" // Cambia el color del texto de placeholder
              />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
                placeholderTextColor="black" // Cambia el color del texto de placeholder
              />
              <Pressable style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Iniciar sesión</Text>
              </Pressable>
              <Pressable style={styles.registerButton} onPress={() => setIsRegistering(true)}>
                <Text style={styles.registerButtonText}>Registrarse</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fondo traslúcido
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingLeft: 10,
    color: 'white', // Cambia el color del texto de entrada
  },
  registerButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  registerButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
