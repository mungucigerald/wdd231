const params = new URLSearchParams(window.location.search);
const set = (id, value) => {
    const el = document.querySelector(`#${id}`);
    if (el) el.textContent = value || '-';
};

set('first', params.get('first'));
set('fullName', `${params.get('first') || ''} ${params.get('last') || ''}`.trim());
set('email', params.get('email'));
set('phone', params.get('phone'));
set('organization', params.get('organization'));
set('membership', params.get('membership'));
set('timestamp', params.get('timestamp'))