import React, { useState } from "react";
import { Timings } from "../model/timings";
import { NotificationSettings } from "../model/notification-settings";
import { UserNode } from "../model/user";
import { WhitelistManager } from "./WhitelistManager";

interface SettingMenuProps {
  setSettingState: (state: boolean) => void;
  currentTimings: Timings;
  setTimings: (timings: Timings) => void;
  whitelistedUsers: readonly UserNode[];
  onWhitelistUpdate: (users: readonly UserNode[]) => void;
  currentNotificationSettings: NotificationSettings;
  setNotificationSettings: (settings: NotificationSettings) => void;
}

export const SettingMenu = ({
  setSettingState,
  currentTimings,
  setTimings,
  whitelistedUsers,
  onWhitelistUpdate,
  currentNotificationSettings,
  setNotificationSettings,
}: SettingMenuProps) => {
  const [timeBetweenSearchCycles, setTimeBetweenSearchCycles] = useState(currentTimings.timeBetweenSearchCycles);
  const [timeToWaitAfterFiveSearchCycles, setTimeToWaitAfterFiveSearchCycles] = useState(currentTimings.timeToWaitAfterFiveSearchCycles);
  const [timeBetweenUnfollows, setTimeBetweenUnfollows] = useState(currentTimings.timeBetweenUnfollows);
  const [timeToWaitAfterFiveUnfollows, setTimeToWaitAfterFiveUnfollows] = useState(currentTimings.timeToWaitAfterFiveUnfollows);
  const [notificationsEnabled, setNotificationsEnabled] = useState(currentNotificationSettings.enabled);
  const [webhookUrl, setWebhookUrl] = useState(currentNotificationSettings.webhookUrl);
  const [notifyOnSuccess, setNotifyOnSuccess] = useState(currentNotificationSettings.notifyOnSuccess);
  const [notifyOnFailure, setNotifyOnFailure] = useState(currentNotificationSettings.notifyOnFailure);

  const handleSave = (event: any) => {
    event.preventDefault();
    setTimings({
      timeBetweenSearchCycles,
      timeToWaitAfterFiveSearchCycles,
      timeBetweenUnfollows,
      timeToWaitAfterFiveUnfollows,
    });
    setNotificationSettings({
      enabled: notificationsEnabled,
      webhookUrl: webhookUrl.trim(),
      notifyOnSuccess,
      notifyOnFailure,
    });
    setSettingState(false);
  };

  // @ts-ignore
  const handleInputChange = (event: any, setter: (value: number) => void) => {

    const value = Number(event?.target?.value);
    setter(value);
  };

  return (
    <form onSubmit={handleSave}>
      <div className="backdrop">
        <div className="setting-menu">
          {/* Settings Module */}
          <div className="settings-module">
            <div className="module-header">
              <h3>Settings</h3>
            </div>

            <div className="settings-content">
              <div className="row">
                <label className="minimun-width">Default time between search cycles</label>
                <input
                  type="number"
                  id="searchCycles"
                  name="searchCycles"
                  min={500}
                  max={999999}
                  value={timeBetweenSearchCycles}
                  onChange={(e) => handleInputChange(e, setTimeBetweenSearchCycles)}
                />
                <label className="margin-between-input-and-label">(ms)</label>
              </div>

              <div className="row">
                <label className="minimun-width">Default time to wait after five search cycles</label>
                <input
                  type="number"
                  id="fiveSearchCycles"
                  name="fiveSearchCycles"
                  min={4000}
                  max={999999}
                  value={timeToWaitAfterFiveSearchCycles}
                  onChange={(e) => handleInputChange(e, setTimeToWaitAfterFiveSearchCycles)}
                />
                <label className="margin-between-input-and-label">(ms)</label>
              </div>

              <div className="row">
                <label className="minimun-width">Default time between unfollows</label>
                <input
                  type="number"
                  id="timeBetweenUnfollow"
                  name="timeBetweenUnfollow"
                  min={1000}
                  max={999999}
                  value={timeBetweenUnfollows}
                  onChange={(e) => handleInputChange(e, setTimeBetweenUnfollows)}
                />
                <label className="margin-between-input-and-label">(ms)</label>
              </div>

              <div className="row">
                <label className="minimun-width">Default time to wait after five unfollows</label>
                <input
                  type="number"
                  id="timeAfterFiveUnfollows"
                  name="timeAfterFiveUnfollows"
                  min={70000}
                  max={999999}
                  value={timeToWaitAfterFiveUnfollows}
                  onChange={(e) => handleInputChange(e, setTimeToWaitAfterFiveUnfollows)}
                />
                <label className="margin-between-input-and-label">(ms)</label>
              </div>



              <div className="notification-settings">
                <h4>Unfollow notifications</h4>
                <p className="notification-help">
                  Optional: POST each unfollow result to an automation webhook (for example IFTTT, Zapier, Make, or a serverless function) that can send email or SMS.
                </p>
                <label className="badge m-small">
                  <input
                    type="checkbox"
                    checked={notificationsEnabled}
                    onChange={(e) => setNotificationsEnabled(e.currentTarget.checked)}
                  />
                  &nbsp;Enable notifications
                </label>
                <div className="row">
                  <label className="minimun-width">Webhook URL</label>
                  <input
                    type="url"
                    id="notificationWebhookUrl"
                    name="notificationWebhookUrl"
                    placeholder="https://hooks.example.com/..."
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.currentTarget.value)}
                  />
                </div>
                <label className="badge m-small">
                  <input
                    type="checkbox"
                    checked={notifyOnSuccess}
                    onChange={(e) => setNotifyOnSuccess(e.currentTarget.checked)}
                  />
                  &nbsp;Notify on successful unfollows
                </label>
                <label className="badge m-small">
                  <input
                    type="checkbox"
                    checked={notifyOnFailure}
                    onChange={(e) => setNotifyOnFailure(e.currentTarget.checked)}
                  />
                  &nbsp;Notify on failed unfollows
                </label>
              </div>

              <div className="warning-container">
                <h3 className="warning"><b>WARNING:</b> Modifying these settings can lead to your account being banned.</h3>
                <h3 className="warning">USE IT AT YOUR OWN RISK!!!!</h3>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="module-divider" />

          {/* Whitelist Management Module */}
          <div className="whitelist-module">
            <WhitelistManager
              whitelistedUsers={whitelistedUsers}
              onWhitelistUpdate={onWhitelistUpdate}
            />
          </div>

          {/* Action Buttons */}
          <div className="btn-container">
            <button className="btn" type="button" onClick={() => setSettingState(false)}>Cancel</button>
            <button className="btn" type="submit">Save</button>
          </div>
        </div>
      </div>
    </form>
  );
};
