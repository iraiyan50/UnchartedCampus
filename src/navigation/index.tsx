import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import bell_icon from '../assets/bell.png';
import home_icon from '../assets/home.png';
import user_icon from '../assets/user.png';
import newspaper_icon from '../assets/newspaper.png';
import { Home } from './screens/Home';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import Updates from './screens/Updates';
import { NotFound } from './screens/NotFound';
import { Cafeteria } from './screens/Cafeteria';
import { Classroom } from './screens/Classroom';
import { Club } from './screens/Club';
import  CampusNavigationAR  from './screens/CampusNavigationAR';
import { Transport } from './screens/Transport';
import ProfilePage from './screens/ProfilePage';
import { Login } from './screens/Login';


const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Feed',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={home_icon}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Updates: {
      screen: Updates,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            source={bell_icon}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    // Profile: {
    //   screen: (props) => <Profile {...props} />,
    //   options: {
    //     tabBarIcon: ({ color, size }) => (
    //       <Image
    //       source={user_icon}
    //       tintColor={color}
    //       style={{
    //         width: size,
    //         height: size,
    //       }}
    //       />
    //     ),
    //   },
    //   initialParams: {
    //     user: 'jane', // Passing initial parameters here for the Profile screen
    //   },
    // },
    Profile: {
      screen: ProfilePage,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            source={user_icon}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    CampusNavigationAR: {
      screen: CampusNavigationAR,
      options: {
        tabBarIcon: ({ color, size }: { color: string; size: number }) => (
          <Image
          source={newspaper_icon} // You can use a different icon for AR navigation
          tintColor={color}
          style={{
            width: size,
            height: size,
          }}
          />
      ),
    },
  },
},
});


const RootStack = createNativeStackNavigator({
  screens: {

    Login: { // Add Login screen
      screen: Login,
      options: {
        title: 'Login',
        headerShown: false, // Optional: Hide header if not needed
      },
    },
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    Cafeteria: {
      screen: Cafeteria,
      linking: {
        // path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    Classroom: {
      screen: Classroom,
      linking: {
        // path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    Club: {
      screen: Club,
      linking: {
        // path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    // CampusNavigationAR: {
    //   screen: CampusNavigationAR,
    //   linking: {
    //     // path: ':user(@[a-zA-Z0-9-_]+)',
    //     parse: {
    //       user: (value) => value.replace(/^@/, ''),
    //     },
    //     stringify: {
    //       user: (value) => `@${value}`,
    //     },
    //   },
    // },
    Transport: {
      screen: Transport,
      linking: {
        // path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
