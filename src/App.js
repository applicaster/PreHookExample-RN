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

    this.canPresentCallback = this.canPresentCallback.bind(this);
    this.requestPostLaunchCallback = this.requestPostLaunchCallback.bind(this);
    this.executeHookCallback = this.executeHookCallback.bind(this);
    this.screenWillDismissCallback = this.screenWillDismissCallback.bind(this);

    this.state = {
      canPresent: false,
      requestPostLaunchCompletion: false,
      readyToExecute: false,
      screenDimissed: false,
    };
  }
  
  componentWillMount() {
    const CAN_PRESENT_SCREEN_PLUGIN_EVENT = 'can_present_screen_plugin';
    const REQUEST_RECURRING_POST_LAUNCH_COMPLETION = 'request_reccuring_post_launch_completion';
    const EXECUTE_HOOK_EVENT = 'execute_hook';
    const SCREEN_WILL_DISMISS = 'screen_will_dismiss';
    
    if (Platform.OS === 'ios') {
      const eventEmitter = new NativeEventEmitter(HookManager);
      this.canPresentScreenPluginSubscription = eventEmitter.addListener(CAN_PRESENT_SCREEN_PLUGIN_EVENT, this.canPresentCallback);
      this.requestRecurringPostLaunchCompletionSubscription = eventEmitter.addListener(REQUEST_RECURRING_POST_LAUNCH_COMPLETION, this.requestPostLaunchCallback);
      this.executeHookEventSubscription = eventEmitter.addListener(EXECUTE_HOOK_EVENT, this.executeHookCallback);
      this.screenWillDismissSubscription = eventEmitter.addListener(SCREEN_WILL_DISMISS, this.screenWillDismissCallback);
    }
  }

  canPresentCallback() {
    this.state.set({ canPresent: true });
    HookManager.allowPresentScreenPlugin(true);
  }

  requestPostLaunchCallback(params) {
    const { hook_presentation_index, data_dict } = params;
    this.state.set({ requestPostLaunchCallback: true });
    HookManager.recurringPostLaunchHook(true);
  }

  executeHookCallback() {
    this.state.set({ readyToExecute: true });
  }

  screenWillDismissCallback() {
    this.state.set({ screenDimissed: true });
  }
  
  render() {
    const { canPresent,
            requestPostLaunchCompletion,
            readyToExecute,
            screenDimissed } = this.state;

    return (
      <View style={ styles.container }>
        <View>
          <Text>`Can Present Plugin: ${canPresent}`</Text>
          <Text>`Request Post Launch Completion Received: ${requestPostLaunchCompletion}`</Text>
          <Text>`Ready To Execute Plugin: ${readyToExecute}`</Text>
          <Text>`Screen Dimissed Event: ${screenDimissed}`</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => { ScreenPlugin.hookFinishedWork(true); }}>
            <Text style={styles.button}>Hook Finished Work</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { ScreenPlugin.removeScreenPluginFromScreen(); }}>
            <Text style={styles.button}>Remove Screen Plugin From Screen</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { ScreenPlugin.removeScreenPluginFromNavigationStack(); }}>
            <Text style={styles.button}>Remove Screen Plugin From Navigation Stack</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default App;
