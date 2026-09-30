jest.mock('react-native-device-info', () => ({ __esModule: true, default: { getBundleId: () => 'com.anythingllm.personal' } }));
jest.mock('@react-native-firebase/app', () => ({ getApp: jest.fn(() => { throw new Error('No Firebase project'); }) }));
jest.mock('@react-native-firebase/analytics', () => ({ getAnalytics: jest.fn(), logEvent: jest.fn(), setAnalyticsCollectionEnabled: jest.fn() }));
jest.mock('@react-native-firebase/crashlytics', () => ({ getCrashlytics: jest.fn(), log: jest.fn(), recordError: jest.fn(), setCrashlyticsCollectionEnabled: jest.fn() }));
jest.mock('@/utils/constants', () => ({ isDebugMode: false }));

import Telemetry from '@/utils/Telemetry';
import { getApp } from '@react-native-firebase/app';
import { logEvent } from '@react-native-firebase/analytics';

test('personal app starts without Firebase and cannot enable reporting', async () => {
    expect(await Telemetry.isEnabled()).toBe(false);
    await Telemetry.setEnabled(true);
    Telemetry.logEvent('test');
    Telemetry.recordError(new Error('test'));
    expect(await Telemetry.isEnabled()).toBe(false);
    expect(getApp).not.toHaveBeenCalled();
    expect(logEvent).not.toHaveBeenCalled();
});
