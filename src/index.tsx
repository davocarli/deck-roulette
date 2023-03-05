import {
	ButtonItem,
	definePlugin,
	PanelSection,
	PanelSectionRow,
	Router,
	ServerAPI,
	staticClasses
} from "decky-frontend-lib"
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi"

const randomIndex = (max: number) => Math.floor(Math.random() * max)

const getAppIds = (installedOnly: boolean = true) => {
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

const navigateToRandomGame = (appIds: number[]) => {
	const randomAppId = appIds[randomIndex(appIds.length)]
	Router.Navigate(`/library/app/${randomAppId}}`)
	Router.CloseSideMenus()
}

const DeckRoulette = () => {
	return (
		<div>
			<PanelSection title="Random Game">
				<PanelSectionRow>
					<ButtonItem
						layout="below"
						onClick={() => navigateToRandomGame(getAppIds(true))}
					>
						Random Installed Game
					</ButtonItem>
				</PanelSectionRow>
				<PanelSectionRow>
					<ButtonItem
						layout="below"
						onClick={() => navigateToRandomGame(getAppIds(false))}
					>
						Random Game (Any)
					</ButtonItem>
				</PanelSectionRow>
			</PanelSection>
		</div>
	)
}

export default definePlugin((serverApi: ServerAPI) => {
	return {
		title: <div className={staticClasses.Title}>DeckRoulette</div>,
		content: <DeckRoulette />,
		icon: <GiPerspectiveDiceSixFacesRandom />,
		onDismount() {},
	}
})
