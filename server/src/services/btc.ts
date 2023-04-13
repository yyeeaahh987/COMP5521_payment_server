import * as config from '../config';
import axios from 'axios';
import { ApiError } from './model';

export async function getTotal(): Promise<any> {
    return { total: 0 }
}