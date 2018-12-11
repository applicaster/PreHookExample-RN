import React, { Component } from 'react';
import { NativeEventEmitter, NativeModules, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { HookManager, ScreenPlugin } = NativeModules;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 12,
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
});

class App extends Component {
  constructor(props) {
    super(props);

    this.screenWillDismissCallback = this.screenWillDismissCallback.bind(this);

    this.state = {
      screenDimissed: false,
    };
  }

  componentWillMount() {
    const SCREEN_WILL_DISMISS = 'screen_will_dismiss';
    
    if (Platform.OS === 'ios') {
      const eventEmitter = new NativeEventEmitter(HookManager);
      this.screenWillDismissSubscription = eventEmitter.addListener(SCREEN_WILL_DISMISS, this.screenWillDismissCallback);
    }
  }

  screenWillDismissCallback() {
    HookManager.hookFinishedWork(false, null, { foo: 'bar' }, true);
  }

  hookFinishedWithSuccess() {
    HookManager.hookFinishedWork(true, null, { foo: 'bar' }, false);
  }

  hookFinishedWithSuccessWithRemoveFromStack() {
    HookManager.hookFinishedWork(true, null, { foo: 'bar' }, false);
    ScreenPlugin.removeScreenPluginFromNavigationStack();
  }
  
  hookFinishedWithFail() {
    HookManager.hookFinishedWork(false, null, { foo: 'bar' }, false);
  }

  hookFinishedWithFailBlockFlow() {
    HookManager.hookFinishedWork(false, null, { foo: 'bar' }, true);
    ScreenPlugin.removeScreenPluginFromScreen();
  }

  render() {
    return (
      <View style={ styles.container }>
        <View>
          <TouchableOpacity onPress={this.hookFinishedWithSuccess}>
            <Text style={styles.button}>Hook Finished Success</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.hookFinishedWithSuccessWithRemoveFromStack}>
            <Text style={styles.button}>Hook Finished Success Remove From Stack</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.hookFinishedWithFail}>
            <Text style={styles.button}>Hook Finished Fail</Text>
          </TouchableOpacity>

            <TouchableOpacity onPress={this.hookFinishedWithFailBlockFlow}>
            <Text style={styles.button}>Hook Finished Fail and block flow</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { ScreenPlugin.removeScreenPluginFromScreen(); }}>
            <Text style={styles.button}>Remove Screen Plugin From Screen</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default App;