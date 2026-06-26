import { requireRole } from '@/lib/core/session';


const layout = async({children}) => {
    await requireRole('reader')
    return children;
};

export default layout;