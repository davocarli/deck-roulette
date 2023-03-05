import {
	ButtonItem,
	ConfirmModal,
	DialogBody,
	DialogBodyText,
	DialogButton,
	Focusable,
	ModalRoot,
	PanelSection,
	PanelSectionRow,
	ServerAPI,
	showModal,
	SliderField,
	TextField,
	ToggleField
} from "decky-frontend-lib"
import { useEffect, useState } from "react"

import { getAllApps } from "../utils"

type ListEditorProps = {
	currentName?: string
	currentList: number[]
	setEditingList: (val: undefined) => void
	serverApi: ServerAPI
	setCustomLists: (val: { [key: string]: number[] }) => void
}

export const ListNameModal = ({
	closeModal,
	initialText,
	onOK,
}: {
	closeModal?: any
	initialText: string
	onOK: (val: string) => void
}) => {
	const [text, setText] = useState(initialText)

	return (
		<ConfirmModal
			strTitle="Game List Name"
			onOK={() => {
				onOK(text)
				closeModal()
			}}
			onCancel={closeModal}
		>
			{" "}
			<TextField
				label="Names must be unique."
				value={text}
				onChange={(e) => {
					setText(e.target.value)
				}}
			/>
		</ConfirmModal>
	)
}

const ListEditor = ({
	currentName = "New Game List",
	currentList,
	setEditingList,
	serverApi,
	setCustomLists,
}: ListEditorProps) => {
	const [newName, setNewName] = useState(currentName)
	const [appIds, setAppIds] = useState(currentList)
	const [allApps, setAllApps] =
		useState<{ appName: String; appId: number }[]>()

	useEffect(() => setAllApps(getAllApps()), [])

	if (!allApps) return <PanelSection spinner title="Loading..." />

	const removeApp = (appId: number) => {
		setAppIds(appIds.filter((id) => id !== appId))
	}

	const addApp = (appId: number) => {
		setAppIds([...appIds, appId])
	}

	const addAll = () => {
		setAppIds(allApps.map(({ appId }) => appId))
	}

	const updateApp = (appId: number, included: boolean) => {
		if (included) {
			addApp(appId)
		} else {
			removeApp(appId)
		}
	}

	const save = () => {
		serverApi
			.callPluginMethod("update_game_list", {
				name: currentName,
				new_list: appIds,
				new_name: newName === currentName ? undefined : newName,
			})
			.then((res) => {
				console.log(res)
				if (res.success) {
					setCustomLists(res.result)
				}
				setEditingList(undefined)
			})
	}

	return (
		<div>
			<PanelSection title={newName}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "10px",
						borderBottom: "1px solid #23262e",
						paddingBottom: "10px",
					}}
				>
					<DialogButton
						style={{ width: "100%" }}
						onClick={() =>
							showModal(
								<ListNameModal
									initialText={newName}
									onOK={setNewName}
								/>
							)
						}
					>
						Update Name
					</DialogButton>
					<Focusable
						style={{
							display: "flex",
							width: "100%",
							justifyContent: "space-between",
							gap: "10px",
							padding: "0px",
						}}
					>
						<DialogButton
							onClick={() => addAll()}
							style={{
								minWidth: "0px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								flexGrow: 1,
							}}
						>
							<small>Select All</small>
						</DialogButton>
						<DialogButton
							onClick={() => setAppIds([])}
							style={{
								minWidth: "0px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								flexGrow: 1,
							}}
						>
							<small>Remove All</small>
						</DialogButton>
					</Focusable>
					<DialogButton onClick={() => save()}>Save</DialogButton>
				</div>
			</PanelSection>
			<PanelSection title="Select Games">
				{allApps.map(({ appName, appId }) => (
					<PanelSectionRow key={appId}>
						<ToggleField
							label={appName}
							checked={appIds.includes(appId)}
							onChange={(e) => updateApp(appId, e)}
						/>
					</PanelSectionRow>
				))}
			</PanelSection>
		</div>
	)
}

export default ListEditor
