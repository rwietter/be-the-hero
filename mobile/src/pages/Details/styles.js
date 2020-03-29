import { StyleSheet } from 'react-native';
import Constans from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constans.statusBarHeight + 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  incident: {
    padding: 24,
    marginTop: 48,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginBottom: 16,
  },
  inicidentProperty: {
    fontSize: 16,
    color: '#41414d',
    marginTop: 24,
    fontWeight: 'bold',
  },
  inicidentValue: {
    marginTop: 8,
    fontSize: 15,
    color: '#737380',
  },
  contentBox: {
    padding: 24,
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginBottom: 16,
  },
  heroTitle: {
    color: '#13131a',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 30,
  },
  heroDescription: {
    fontSize: 15,
    color: '#737380',
    marginTop: 16,
  },
  actions: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    backgroundColor: '#e02041',
    borderRadius: 8,
    height: 50,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
