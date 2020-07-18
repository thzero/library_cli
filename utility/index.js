import dayjs from 'dayjs';
import shortUUID from 'short-uuid';

const uuidTranslator = shortUUID();

class Utility {
	static generateId() {
		//return uuidv4()
		return Utility.generateShortId();
	}

	static generateShortId() {
		return uuidTranslator.fromUUID(uuidv4());
	}
}

export default Utility;
