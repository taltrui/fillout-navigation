interface IconProps {
	className?: string;
	[key: string]: any;
}

const FileIcon = ({ className, ...props }: IconProps) => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		{...props}
	>
		<title>File Icon</title>
		<path
			d="M10.2798 2.29167H4.79168C4.33144 2.29167 3.95834 2.66477 3.95834 3.12501V16.875C3.95834 17.3352 4.33144 17.7083 4.79168 17.7083H15.2083C15.6686 17.7083 16.0417 17.3352 16.0417 16.875V8.05352C16.0417 7.8325 15.9539 7.62054 15.7976 7.46426L10.8691 2.53575C10.7128 2.37947 10.5008 2.29167 10.2798 2.29167Z"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
		<path
			d="M7.29166 11.0417H10.2083M7.29166 14.375H12.7083"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
		<path
			d="M10.625 2.70833V6.87499C10.625 7.33523 10.9981 7.70833 11.4583 7.70833H15.625"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
	</svg>
);

export default FileIcon;
