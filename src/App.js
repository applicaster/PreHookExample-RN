import React, { Component } from 'react';
import { Button, NativeEventEmitter, NativeModules, Platform, Text, View } from 'react-native';

const { HookManager, ScreenPlugin } = NativeModules;

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
  }

  requestPostLaunchCallback(params) {
    const { hook_presentation_index, data_dict } = params;
    this.state.set({ requestPostLaunchCallback: true });
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
      <View style={ { flex: 1 } }>
        <View>
          <Text>`Can Present Plugin: ${canPresent}`</Text>
          <Text>`Request Post Launch Completion Received: ${requestPostLaunchCompletion}`</Text>
          <Text>`Ready To Execute Plugin: ${readyToExecute}`</Text>
          <Text>`Screen Dimissed Event: ${screenDimissed}`</Text>
        </View>
        <View>
          <Button onPress={() => { ScreenPlugin.hookFinishedWork(true); }}>Hook Finished Work</Button>
          <Button onPress={() => { ScreenPlugin.allowPresentScreenPlugin(true); }}>Allow Present Screen Plugin</Button>
          <Button onPress={() => { ScreenPlugin.recurringPostLaunchHook(true); }}>Recurring Post Launch Hook</Button>
          <Button onPress={() => { ScreenPlugin.removeScreenPluginFromScreen(); }}>Remove Screen Plugin From Screen</Button>
          <Button onPress={() => { ScreenPlugin.removeScreenPluginFromNavigationStack(); }}>Remove Screen Plugin From Navigation Stack</Button>
        </View>
      </View>
    );
  }
}

export default App;
