import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  SectionList,
  TextInput,
  Alert,
} from 'react-native';
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  CHILL_STATUS_PENDING
} from '../constants/AppConstants'
import { getActivityStatus } from '../redux/actions/activityActions'

class ActivityLandingScreen extends React.Component {
  state = {
    isDateTimePickerVisible: false,
    chillLocation: "",
    chillTime: null,
  }

  componentDidMount() {
    this.updateTimer = setInterval(
      () => this.updateChill(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.updateTimer);
  }

  updateChill() {
    const {
      getActivityStatus,
      currentActivityId
    } = this.props;
    getActivityStatus(currentActivityId);
  }

  render() {
    const { chillRequestStatus } = this.props;
    if (chillRequestStatus === CHILL_STATUS_PENDING) {
      return (
        <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text>Hey porn, its loading!</Text>
        </View>
      </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text>Hey porn!</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { activity } = state;
  return {
    chillRequestStatus: activity.chillRequestStatus,
    currentActivityId: activity.currentActivityId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getActivityStatus: activityId => dispatch(getActivityStatus(activityId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityLandingScreen)

const styles = StyleSheet.create({
  // Custom styles
  chillersContainer: {
    flex: 2
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

  // Pre-built styles
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 30,
    marginLeft: -10,
  },
  getStartedContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 35,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
