import { StackNavigator } from 'react-navigation';
import Home from "../screens/Home"
import LogIn from "../screens/LogIn"
import SignUp from "../screens/SignUp"
import Navigation from "../screens/Navigation"
import DeckCreate from "../screens/DeckCreate"
import DeckCards from "../screens/DeckCards"
import MatchCreate from "../screens/MatchCreate"
import MatchCards from "../screens/MatchCards"
import MatchSearch from "../screens/MatchSearch"
import MatchResults from "../screens/MatchResults"
import MatchSingle from "../screens/MatchSingle"
import ArchetypeSearch from "../screens/ArchetypeSearch"
import ArchetypeResults from "../screens/ArchetypeResults"
import ArchetypeCompare from "../screens/ArchetypeCompare"

const HomeStack = StackNavigator({
  Home:   { screen: Home },
  LogIn:  { screen: LogIn },
  SignUp: { screen: SignUp },
  Navigation: { screen: Navigation }
});
const DeckCreateStack = StackNavigator({
  DeckCreate: { screen: DeckCreate },
  DeckCards: { screen: DeckCards },
});
const MatchCreateStack = StackNavigator({
  MatchCreate: { screen: MatchCreate },
  MatchCards: { screen: MatchCards }
});
const MatchSearchStack = StackNavigator({
  MatchSearch: { screen: MatchSearch },
  MatchResults: { screen: MatchResults },
  MatchSingle: { screen: MatchSingle }
});
const ArchetypeSearchStack = StackNavigator({
  ArchetypeSearch: { screen: ArchetypeSearch },
  ArchetypeResults: { screen: ArchetypeResults },
  ArchetypeCompare: { screen: ArchetypeCompare },
});

export default StackNavigator(
  {
    Home: {
      screen: HomeStack,
    },
    DeckCreation: {
      screen: DeckCreateStack,
    },
    MatchCreation: {
      screen: MatchCreateStack,
    },
    MatchSearching: {
      screen: MatchSearchStack,
    },
    ArchetypeSearching: {
      screen: ArchetypeSearchStack,
    }
  },
  {
    // mode: 'modal',
    // headerMode: 'none',
    // cardStyle: { paddingTop: StatusBar.currentHeight },
  },
);