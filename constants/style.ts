// teamStyles.ts
import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll',
    padding: 20,
    backgroundColor: 'white',
    alignSelf: 'auto',
    justifyContent: 'flex-start',
    margin: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  teamItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
