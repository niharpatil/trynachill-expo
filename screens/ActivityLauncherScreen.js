import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  SectionList,
} from 'react-native';
import { CheckBox, FormInput } from 'react-native-elements'
import {connect} from 'react-redux'

import { toggleChillerSelection, initiateChill } from '../redux/actions/activityActions';

class ActivityLauncherScreen extends React.Component {
  static navigationOptions = {
    title: 'ActivityLauncher',
  };
  render() {
    const { navigate } = this.props.navigation;
    const {
      chillerUsers
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ position:'absolute' }}>
          <Button
            onPress={() => navigate('Home')}
            title="Go back"
          />
        </View>
        <View style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text>Pick your chillers</Text>
          </View>
          <View style={{ flex: 1 }}>
            <SectionList style={styles.chillersContainer}
              sections={[
                { title: 'Chillers', data: this._chillersObjectToList(chillerUsers)},
              ]}
              renderItem={({ item }) =>  this._renderCheckbox(item) }
              renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
              keyExtractor={(item, index) => item.userid}
            />
          </View>
        </View>
        <View style={styles.container}>
          <Button 
            onPress={() => this._launchChillRequest()}
            title="Send chill request"
          />
        </View>

      </View>
    );
  }

  _launchChillRequest(){
    const {
      chillerUsers
    } = this.props;
    let chillerList = this._chillersObjectToList(chillerUsers)
    chillerList = chillerList.filter(item => item.selected)
    chillerList = chillerList.map(item => item.userid)

    this.props.initiateChill(chillerList)
  }

  _chillersObjectToList(chillers){
    return Object.keys(chillers).map(userid => {
      return {...chillers[userid], userid}
    })
  }

  _renderCheckbox(user){
    return (
      <CheckBox 
        title={user.name}
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checked={user.selected || false}
        onPress={() => this.props.toggleChillerSelection(user.userid)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  const {activity} = state;
  return {
    chillerUsers: activity.chillerUsers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleChillerSelection: userid => dispatch(toggleChillerSelection(userid)),
    initiateChill: (userids) => dispatch(initiateChill(userids))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityLauncherScreen)

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
