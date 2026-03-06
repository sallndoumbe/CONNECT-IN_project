import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function SearchAndFilters({ onSearch, onFilter }) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (value) => {
    setSearchTerm(value);
    applyFilters({ search: value, sortBy, fromDate, toDate });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    applyFilters({ search: searchTerm, sortBy: value, fromDate, toDate });
  };

  const handleDateChange = (from, to) => {
    setFromDate(from);
    setToDate(to);
    applyFilters({ search: searchTerm, sortBy, fromDate: from, toDate: to });
  };

  const applyFilters = (filters) => {
    const params = {};
    
    if (filters.search) {
      params.search = filters.search;
    }
    
    if (filters.sortBy) {
      params.sort = filters.sortBy;
    }
    
    if (filters.fromDate) {
      params.from_date = filters.fromDate;
    }
    
    if (filters.toDate) {
      params.to_date = filters.toDate;
    }
    
    onFilter(params);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSortBy('latest');
    setFromDate('');
    setToDate('');
    onFilter({});
  };

  const hasActiveFilters = searchTerm || sortBy !== 'latest' || fromDate || toDate;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 mb-6">
      {/* Barre de recherche principale */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={t('search.placeholder')}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
            showFilters 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {t('search.filters')}
          {hasActiveFilters && (
            <span className="ml-1 px-2 py-0.5 bg-white text-blue-600 rounded-full text-xs font-bold">
              {[searchTerm, sortBy !== 'latest', fromDate, toDate].filter(Boolean).length}
            </span>
          )}
        </button>
      </div>

      {/* Panneau de filtres avancés */}
      {showFilters && (
        <div className="pt-4 border-t border-gray-200 space-y-4 animate-slideDown">
          {/* Tri */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('search.sortBy')}
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => handleSortChange('latest')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                  sortBy === 'latest'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                📅 {t('search.latest')}
              </button>
              <button
                onClick={() => handleSortChange('popular')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                  sortBy === 'popular'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🔥 {t('search.popular')}
              </button>
            </div>
          </div>

          {/* Filtres de date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('search.period')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">{t('search.from')}</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => handleDateChange(e.target.value, toDate)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">{t('search.to')}</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => handleDateChange(fromDate, e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Bouton réinitialiser */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {t('search.reset')}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
