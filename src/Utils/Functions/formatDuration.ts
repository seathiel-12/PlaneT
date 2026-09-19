export const formatDuration = (temp1: string, temp2: string): string => {
	const start = new Date(temp1).getTime();
	const end = new Date(temp2).getTime();

	if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) {
		return '0h00';
	}

	const totalMinutes = Math.floor((end - start) / 60000);
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;

	return `${hours}h${minutes.toString().padStart(2, '0')}`;
};
