import axios from 'axios';
import config from '../../config';

export default axios.create(config.axios);