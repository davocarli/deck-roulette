import os
from settings import SettingsManager

# The decky plugin module is located at decky-loader/plugin
# For easy intellisense checkout the decky-loader code one directory up
# or add the `decky-loader/plugin` path to `python.analysis.extraPaths` in `.vscode/settings.json`
import decky_plugin


class Plugin:
    game_lists = SettingsManager("deck-roulette", os.path.join(decky_plugin.DECKY_PLUGIN_SETTINGS_DIR, "gameLists.json"))

    # A normal method. It can be called from JavaScript using call_plugin_function("method_1", argument1, argument2)
    async def add(self, left, right):
        return left + right

    # Asyncio-compatible long-running code, executed in a task when the plugin is loaded
    async def _main(self):
        decky_plugin.logger.info("Hello World!")

    # Function called first during the unload process, utilize this to handle your plugin being removed
    async def _unload(self):
        decky_plugin.logger.info("Goodbye World!")
        pass

    # # Get Game Lists
    # async def get_game_lists(self):
    #     self.game_lists.read()
    #     self.game_lists
    #     return self.game_lists.getSetting("gameLists", {})
    
    # # Update Game List
    # async def update_game_list(self, name, new_list, new_name=None):
    #     self.game_lists.read()
    #     game_lists = self.game_lists.getSetting("gameLists", {})
    #     if new_name is not None:
    #         game_lists[new_name] = new_list
    #         del game_lists[name]
    #     else:
    #         game_lists[name] = new_list
    #     self.game_lists.setSetting("gameLists", game_lists)
    #     self.game_lists.commit()
    #     decky_plugin.logger.info(game_lists)
    #     return game_lists
    
    # # Delete Game List
    # async def delete_game_list(self, name):
    #     self.game_lists.read()
    #     game_lists = self.game_lists.getSetting("gameLists", {})
    #     del game_lists[name]
    #     self.game_lists.setSetting("gameLists", game_lists)
    #     self.game_lists.commit()
    #     decky_plugin.logger.info(game_lists)
    #     return game_lists
