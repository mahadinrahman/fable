import { requireRole } from '@/lib/core/session';

const layout = async({children}) => {
    await requireRole('writer')
    return children;
};

export default layout;