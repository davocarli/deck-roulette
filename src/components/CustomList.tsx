import { ButtonItem, DialogButton, Focusable } from "decky-frontend-lib"
import { BsFillTrashFill } from "react-icons/bs"
import { RiPencilFill } from "react-icons/ri"

type CustomListProps = {
	children?: JSX.Element | string
	onSelect: () => void
	onEdit: () => void
	onDelete: () => void
}

const IconButton = ({
	children,
	onSelect,
}: {
	children: any
	onSelect: () => void
}) => (
	<DialogButton
		style={{
			minWidth: "0px",
			width: "30px",
			padding: "5px",
			height: "100%",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		}}
		onClick={() => onSelect()}
	>
		{children}
	</DialogButton>
)

const CustomListItem = ({
	children,
	onSelect,
	onEdit,
	onDelete,
}: CustomListProps) => (
	<Focusable
		style={{
			display: "flex",
			width: "100%",
			gap: "5px",
			padding: "0px",
			alignItems: "stretch",
			paddingBottom: "10px",
			borderBottom: "1px solid #23262e",
		}}
	>
		<DialogButton style={{ flexGrow: 1 }} onClick={onSelect}>
			{children}
		</DialogButton>
		<Focusable
			style={{
				display: "flex",
				gap: "1px",
				flexDirection: "column",
				alignItems: "stretch",
				justifyItems: "stretch",
			}}
		>
			<IconButton onSelect={() => onEdit()}>
				<RiPencilFill />
			</IconButton>
			<IconButton onSelect={() => onDelete()}>
				<BsFillTrashFill />
			</IconButton>
		</Focusable>
	</Focusable>
)

export default CustomListItem
