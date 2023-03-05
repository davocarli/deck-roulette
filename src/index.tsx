import {
	ButtonItem,
	definePlugin,
	PanelSection,
	PanelSectionRow,
	ServerAPI,
	staticClasses
} from "decky-frontend-lib"
import React, { useState } from "react"
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi"

import { EXCLUDE_COLLECTION_IDS, getAllApps, getCollections, navigateToRandomGame } from "./utils"

const DeckRoulette = ({ serverApi }: { serverApi: ServerAPI }) => {
	const [allApps] = useState(getAllApps())
	const [collections] = useState(getCollections())

	/* Uncomment to enable in-plugin custom lists
	const [customLists, setCustomLists] = useState<{
		[key: string]: number[]
	}>()
	const [editingList, setEditingList] = useState<{
		listName?: string
		appIds: number[]
	}>()

	useEffect(() => {
		serverApi
			.callPluginMethod<{}, { [key: string]: number[] }>(
				"get_game_lists",
				{}
			)
			.then((res) => {
				console.log(res)
				if (!res.success) return
				setCustomLists(res.result)
			})
	}, [])

	if (editingList)
		return (
			<ListEditor
				currentName={editingList.listName}
				currentList={editingList.appIds}
				setEditingList={setEditingList}
				serverApi={serverApi}
				setCustomLists={setCustomLists}
			/>
		)
  */

	return (
		<div>
			<PanelSection title="Random Game">
				{collections["local-install"] ? (
					<PanelSectionRow>
						<ButtonItem
							layout="below"
							onClick={() =>
								navigateToRandomGame(
									collections["local-install"].appIds
								)
							}
						>
							Installed Game (
							{collections["local-install"].appIds.length})
						</ButtonItem>
					</PanelSectionRow>
				) : null}
				<PanelSectionRow>
					<ButtonItem
						layout="below"
						onClick={() =>
							navigateToRandomGame(
								allApps.map(({ appId }) => appId)
							)
						}
					>
						Library Game ({allApps.length})
					</ButtonItem>
				</PanelSectionRow>
			</PanelSection>
			{/* <PanelSection title="Custom Game Lists">
				{customLists
					? Object.entries(customLists).map(([listName, appIds]) => (
							<PanelSectionRow key={listName}>
								<CustomListItem
									onSelect={() =>
										navigateToRandomGame(appIds)
									}
									onEdit={() =>
										setEditingList({ listName, appIds })
									}
									onDelete={() =>
										serverApi
											.callPluginMethod(
												"delete_game_list",
												{ name: listName }
											)
											.then((res) => {
												if (res.success)
													setCustomLists(res.result)
											})
									}
								>
									<span>
										{listName} ({appIds.length})
									</span>
								</CustomListItem>
							</PanelSectionRow>
					  ))
					: null}
				<PanelSectionRow>
					<ButtonItem
						layout="below"
						onClick={() => {
							showModal(
								<ListNameModal
									initialText=""
									onOK={(listName) =>
										setEditingList({ listName, appIds: [] })
									}
								/>
							)
						}}
					>
						Add New List
					</ButtonItem>
				</PanelSectionRow>
			</PanelSection> */}
			<PanelSection title="Steam Collections">
				{Object.entries(collections).map(([listId, list]) => (
					<React.Fragment key={listId}>
						{EXCLUDE_COLLECTION_IDS.includes(listId) ? null : (
							<PanelSectionRow>
								<ButtonItem
									layout="below"
									onClick={() =>
										navigateToRandomGame(list.appIds)
									}
								>
									{list.name} ({list.appIds.length})
								</ButtonItem>
							</PanelSectionRow>
						)}
					</React.Fragment>
				))}
			</PanelSection>
		</div>
	)
}

export default definePlugin((serverApi: ServerAPI) => {
	return {
		title: <div className={staticClasses.Title}>DeckRoulette</div>,
		content: <DeckRoulette serverApi={serverApi} />,
		icon: <GiPerspectiveDiceSixFacesRandom />,
		alwaysRender: true,
		onDismount() {},
	}
})
