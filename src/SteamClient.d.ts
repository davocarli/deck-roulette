// Non-exhaustive definition of the SteamClient that is available in the SP tab
// This object has a lot more properties/methods than are listed here
declare namespace SteamClient {
	const Apps: {
		GetAllShortcuts(): Promise<Shortcut[]>
		RegisterForGameActionStart(
			callback: (
				actionType: number,
				strAppId: string,
				actionName: string
			) => any
		): RegisteredEvent
	}
	const InstallFolder: {
		GetInstallFolders(): Promise<InstallFolder[]>
	}
	const GameSessions: {
		RegisterForAppLifetimeNotifications(
			callback: (appState: AppState) => any
		): RegisteredEvent
	}
	const BrowserView: {
		Create(): any
		CreatePopup(): any
		Destroy(e: any): void
	}

	const Storage: {
		GetJSON(key: string): Promise<string>
		SetObject(key: string, value: {}): Promise<void>
	}
}

declare const enum DisplayStatus {
	Invalid = 0,
	Launching = 1,
	Uninstalling = 2,
	Installing = 3,
	Running = 4,
	Validating = 5,
	Updating = 6,
	Downloading = 7,
	Synchronizing = 8,
	ReadyToInstall = 9,
	ReadyToPreload = 10,
	ReadyToLaunch = 11,
	RegionRestricted = 12,
	PresaleOnly = 13,
	InvalidPlatform = 14,
	PreloadComplete = 16,
	BorrowerLocked = 17,
	UpdatePaused = 18,
	UpdateQueued = 19,
	UpdateRequired = 20,
	UpdateDisabled = 21,
	DownloadPaused = 22,
	DownloadQueued = 23,
	DownloadRequired = 24,
	DownloadDisabled = 25,
	LicensePending = 26,
	LicenseExpired = 27,
	AvailForFree = 28,
	AvailToBorrow = 29,
	AvailGuestPass = 30,
	Purchase = 31,
	Unavailable = 32,
	NotLaunchable = 33,
	CloudError = 34,
	CloudOutOfDate = 35,
	Terminating = 36,
}

type AppState = {
	unAppID: number
	nInstanceID: number
	bRunning: boolean
}

declare namespace appStore {
	function GetAppOverviewByGameID(appId: number): AppOverview
}

type RegisteredEvent = {
	unregister(): void
}

type Shortcut = {
	appid: number
	data: {
		bIsApplication: true
		strAppName: string
		strSortAs: string
		strExePath: string
		strShortcutPath: string
		strArguments: string
		strIconPath: string
	}
}

type AppOverview = {
	appid: string
	display_name: string
	display_status: DisplayStatus
	sort_as: string
}

type App = {
	nAppID: number
	strAppName: string
	strSortAs: string
	rtLastPlayed: number
	strUsedSize: string
	strDLCSize: string
	strWorkshopSize: string
	strStagedSize: string
}

type InstallFolder = {
	nFolderIndex: number
	strFolderPath: string
	strUserLabel: string
	strDriveName: string
	strCapacity: string
	strFreeSpace: string
	strUsedSize: string
	strDLCSize: string
	strWorkshopSize: string
	strStagedSize: string
	bIsDefaultFolder: boolean
	bIsMounted: boolean
	bIsFixed: boolean
	vecApps: App[]
}

type SteamAppOverview = {
	app_type: number
	gameid: string
	appid: number
	display_name: string
	steam_deck_compat_category: number
	size_on_disk: string | undefined // can use the type of this to determine if an app is installed!
	association: { type: number; name: string }[]
	canonicalAppType: number
	controller_support: number
	header_filename: string | undefined
	icon_data: string | undefined
	icon_data_format: string | undefined
	icon_hash: string
	library_capsule_filename: string | undefined
	library_id: number | string | undefined
	local_per_client_data: SteamGameClientData
	m_gameid: number | string | undefined
	m_setStoreCategories: Set<number>
	m_setStoreTags: Set<number>
	mastersub_appid: number | string | undefined
	mastersub_includedwith_logo: string | undefined
	metacritic_score: number
	minutes_playtime_forever: number
	minutes_playtime_last_two_weeks: number
	most_available_clientid: string
	most_available_per_client_data: SteamGameClientData
	mru_index: number | undefined
	optional_parent_app_id: number | string | undefined
	owner_account_id: number | string | undefined
	per_client_data: SteamGameClientData[]
	review_percentage_with_bombs: number
	review_percentage_without_bombs: number
	review_score_with_bombs: number
	review_score_without_bombs: number
	rt_custom_image_mtime: string | undefined
	rt_last_time_locally_played: number | undefined
	rt_last_time_played: number
	rt_last_time_played_or_installed: number
	rt_original_release_date: number
	rt_purchased_time: number
	rt_recent_activity_time: number
	rt_steam_release_date: number
	rt_store_asset_mtime: number
	selected_clientid: string
	selected_per_client_data: SteamGameClientData
	shortcut_override_appid: undefined
	site_license_site_name: string | undefined
	sort_as: string
	third_party_mod: number | string | undefined
	visible_in_game_list: boolean
	vr_only: boolean | undefined
	vr_supported: boolean | undefined
	BHasStoreTag: () => any
	active_beta: number | string | undefined
	display_status: number
	installed: boolean
	is_available_on_current_platform: boolean
	is_invalid_os_type: boolean | undefined
	review_percentage: number
	review_score: number
	status_percentage: number
	store_category: number[]
	store_tag: number[]
}

type SteamCollection = {
	AsDeletableCollection: () => null
	AsDragDropCollection: () => null
	AsEditableCollection: () => null
	GetAppCountWithToolsFilter: (t: any) => any
	allApps: SteamAppOverview[]
	apps: Map<number, SteamAppOverview>
	bAllowsDragAndDrop: boolean
	bIsDeletable: boolean
	bIsDynamic: boolean
	bIsEditable: boolean
	displayName: string
	id: string
	visibleApps: SteamAppOverview[]
}

type CollectionStore = {
	userCollections: SteamCollection[]
	GetUserCollectionsByName: (name: string) => SteamCollection[]
	allAppsCollection: SteamCollection
	allGamesCollection: SteamCollection
	myGamesCollection: SteamCollection
	deckDesktopApps: SteamCollection
	localGamesCollection: SteamCollection
}
