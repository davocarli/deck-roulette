import { Router } from "decky-frontend-lib"

export const EXCLUDE_COLLECTION_IDS = ["local-install", "uncategorized"]

export const randomIndex = (max: number) => Math.floor(Math.random() * max)

export const getAllApps = () => {
	const { collectionStore }: { collectionStore: CollectionStore } =
		window as any
	const apps: { appName: string; appId: number; sortBy: string }[] = []
	collectionStore.allGamesCollection.allApps.forEach((app) => {
		apps.push({
			appName: app.display_name,
			appId: app.appid,
			sortBy: app.sort_as,
		})
	})
	collectionStore.deckDesktopApps.allApps.forEach((app) => {
		apps.push({
			appName: app.display_name,
			appId: app.appid,
			sortBy: app.sort_as,
		})
	})
	apps.sort((a, b) => a.appName.localeCompare(b.sortBy))
	return apps
}

export const getCollections = () => {
	const { collectionStore }: { collectionStore: CollectionStore } =
		window as any
	const collections: { [key: string]: { name: string; appIds: number[] } } =
		{}

	collectionStore.userCollections.forEach((collection) => {
		collections[collection.id] = {
			name: collection.displayName,
			appIds: collection.allApps.map((app) => app.appid),
		}
	})

	return collections
}

export const getAppIds = (installedOnly: boolean = true) => {
	const { collectionStore }: { collectionStore: CollectionStore } =
		window as any
	const appIds: number[] = []
	collectionStore.allGamesCollection.allApps.forEach((app) => {
		if (!installedOnly || app.installed) appIds.push(app.appid)
	})
	collectionStore.deckDesktopApps.allApps.forEach((app) => {
		appIds.push(app.appid)
	})
	return appIds
}

export const navigateToRandomGame = (appIds: number[]) => {
	const randomAppId = appIds[randomIndex(appIds.length)]
	Router.Navigate(`/library/app/${randomAppId}}`)
	Router.CloseSideMenus()
}
