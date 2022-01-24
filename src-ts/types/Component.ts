import Watcher from "../core/observer/watcher";

export interface Component {
  _watcher: Watcher;
  _watchers: Watcher[];
  _isBeingDestroyed?: boolean;
}
